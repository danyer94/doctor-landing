import React, { useState, useEffect } from 'react';
import '../styles/Stripe.css';

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: string;
  features: string[];
  isPopular?: boolean;
  lookup_key: string;
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Básico',
    price: 19.99,
    interval: 'mes',
    lookup_key: 'basic_monthly',
    features: [
      'Acceso a consultas básicas',
      'Historial médico digital',
      'Recordatorios de citas',
      'Soporte por email'
    ]
  },
  {
    id: 'pro',
    name: 'Profesional',
    price: 49.99,
    interval: 'mes',
    lookup_key: 'pro_monthly',
    isPopular: true,
    features: [
      'Todo lo del plan Básico',
      'Consultas prioritarias',
      'Chat 24/7 con especialistas',
      'Descuentos en medicamentos',
      'Reportes mensuales detallados',
      'Soporte prioritario'
    ]
  },
  {
    id: 'enterprise',
    name: 'Empresarial',
    price: 99.99,
    interval: 'mes',
    lookup_key: 'enterprise_monthly',
    features: [
      'Todo lo del plan Profesional',
      'API personalizada',
      'Gestor de cuenta dedicado',
      'Personalización completa',
      'Integración con sistemas propios',
      'Soporte telefónico 24/7'
    ]
  }
];

const PricingCard: React.FC<{
  plan: Plan;
  onSelect: (lookup_key: string) => void;
  isLoading: boolean;
  selectedPlan?: string;
}> = ({ plan, onSelect, isLoading, selectedPlan }) => (
  <div className={`pricing-card ${plan.isPopular ? 'popular' : ''} ${selectedPlan === plan.id ? 'selected' : ''}`}>
    {plan.isPopular && <div className="popular-badge">Más Popular</div>}
    <h3 className="plan-name">{plan.name}</h3>
    <div className="price">
      <span className="currency">$</span>
      <span className="amount">{plan.price}</span>
      <span className="interval">/{plan.interval}</span>
    </div>
    <ul className="features">
      {plan.features.map((feature, index) => (
        <li key={index}>
          <svg className="check-icon" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
          {feature}
        </li>
      ))}
    </ul>
    <button
      className={`select-plan-button ${plan.isPopular ? 'popular' : ''}`}
      onClick={() => onSelect(plan.lookup_key)}
      disabled={isLoading}
    >
      {isLoading && selectedPlan === plan.id ? (
        <div className="loading-spinner"></div>
      ) : (
        'Seleccionar Plan'
      )}
    </button>
  </div>
);

const ProductDisplay = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>();

  const handleSubmit = async (lookup_key: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    setSelectedPlan(plans.find(p => p.lookup_key === lookup_key)?.id);
    
    try {
      const response = await fetch('http://localhost:4242/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lookup_key }),
      });

      if (!response.ok) {
        throw new Error('El servidor no está respondiendo correctamente. Por favor, verifica que el servidor backend esté corriendo en el puerto 4242.');
      }

      const { url } = await response.json();
      if (!url) {
        throw new Error('No se recibió la URL de pago del servidor.');
      }
      window.location.href = url;
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Error al conectar con el servidor de pagos.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pricing-section">
      <div className="pricing-header">
        <h2>Planes de Suscripción</h2>
        <p>Elije el plan que mejor se adapte a tus necesidades</p>
      </div>
      
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}

      <div className="pricing-cards">
        {plans.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            onSelect={handleSubmit}
            isLoading={isLoading}
            selectedPlan={selectedPlan}
          />
        ))}
      </div>
    </div>
  );
};

const SuccessDisplay = ({ sessionId }: { sessionId: string | null }) => {
  return (
    <div className="success-display">
      <div className="success-icon">
        <svg viewBox="0 0 24 24">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
        </svg>
      </div>
      <h2>¡Suscripción Exitosa!</h2>
      <p>Gracias por confiar en nosotros. Tu suscripción ha sido activada.</p>
      <form action="http://localhost:4242/create-portal-session" method="POST">
        <input
          type="hidden"
          id="session-id"
          name="session_id"
          value={sessionId || ''}
        />
        <button className="manage-subscription-button" type="submit">
          Administrar Suscripción
        </button>
      </form>
    </div>
  );
};

const Message = ({ message }: { message: string }) => (
  <div className="message-display">
    <p>{message}</p>
  </div>
);

const Stripe: React.FC = () => {
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>('');

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    
    if (query.get('success')) {
      setSuccess(true);
      setSessionId(query.get('session_id'));
    }

    if (query.get('canceled')) {
      setSuccess(false);
      setMessage('La orden fue cancelada. Puedes intentar nuevamente cuando estés listo.');
    }
  }, []);

  return (
    <div className="stripe-container">
      {success && sessionId ? (
        <SuccessDisplay sessionId={sessionId} />
      ) : message ? (
        <Message message={message} />
      ) : (
        <ProductDisplay />
      )}
    </div>
  );
};

export default Stripe;

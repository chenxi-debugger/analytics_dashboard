// One source of truth for plan names, prices and features
// (used by Pricing, Account Settings → Billing and the user view page).
export const PLANS = [
  {
    name: 'Basic',
    monthly: 0,
    subtitle: 'A simple start for everyone',
    features: ['1 user', '1 GB storage', '3 dashboards', 'Community support'],
  },
  {
    name: 'Team',
    monthly: 49,
    subtitle: 'For small teams getting started',
    features: ['5 users', '20 GB storage', 'Unlimited dashboards', 'Email support'],
  },
  {
    name: 'Company',
    monthly: 99,
    popular: true,
    subtitle: 'For growing companies',
    features: ['10 users', '50 GB storage', 'Role-based access control', 'Priority support'],
  },
  {
    name: 'Enterprise',
    monthly: 199,
    subtitle: 'For large organizations',
    features: ['Unlimited users', '1 TB storage', 'SSO & audit logs', 'Dedicated success manager'],
  },
];

export const ANNUAL_DISCOUNT = 0.2; // 20% off when billed yearly

export const planByName = (name) => PLANS.find((p) => p.name === name) || PLANS[0];

export const yearlyPerMonth = (plan) => Math.round(plan.monthly * (1 - ANNUAL_DISCOUNT));

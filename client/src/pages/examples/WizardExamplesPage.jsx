import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import { Add, CheckCircle, DeleteOutline, Remove, ShoppingCart, LocalShipping, Payment, Verified } from '@mui/icons-material';
import { PageHeader } from '../../components/common';

const STEPS = [
  { label: 'Cart', icon: ShoppingCart },
  { label: 'Address', icon: LocalShipping },
  { label: 'Payment', icon: Payment },
  { label: 'Confirmation', icon: Verified },
];

const START_CART = [
  { id: 1, name: 'Wireless Headphones', seller: 'Audio Co.', price: 129, qty: 1, color: 'primary' },
  { id: 2, name: 'Mechanical Keyboard', seller: 'KeyLab', price: 89, qty: 1, color: 'secondary' },
  { id: 3, name: 'USB-C Hub', seller: 'Plugged', price: 39, qty: 2, color: 'success' },
];

const SHIPPING = [
  { value: 'standard', label: 'Standard (5–7 days)', price: 0 },
  { value: 'express', label: 'Express (2–3 days)', price: 10 },
  { value: 'overnight', label: 'Overnight', price: 25 },
];

const ADDRESSES = [
  { id: 'home', title: 'Home', text: '4135 Parkway Street, Los Angeles, CA 90017' },
  { id: 'office', title: 'Office', text: '87 Hoffman Avenue, New York, NY 10016' },
];

const money = (n) => `$${n.toFixed(2)}`;

function StepIcon({ active, completed, icon }) {
  const Icon = STEPS[icon - 1].icon;
  return (
    <Avatar sx={{ width: 40, height: 40, bgcolor: completed || active ? 'primary.main' : 'action.selected' }}>
      {completed ? <CheckCircle fontSize="small" /> : <Icon fontSize="small" />}
    </Avatar>
  );
}
StepIcon.propTypes = { active: PropTypes.bool, completed: PropTypes.bool, icon: PropTypes.node };

// Checkout flow: cart → address → payment → confirmation. All totals are derived
// from the cart state with useMemo, so changing a quantity updates every step.
const WizardExamplesPage = () => {
  const [active, setActive] = useState(0);
  const [cart, setCart] = useState(START_CART);
  const [address, setAddress] = useState('home');
  const [shipping, setShipping] = useState('standard');
  const [method, setMethod] = useState('card');
  const [card, setCard] = useState({ name: '', number: '', expiry: '', cvv: '' });
  const [error, setError] = useState('');
  const [orderId] = useState(() => Math.floor(100000 + Math.random() * 900000));

  const totals = useMemo(() => {
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const ship = SHIPPING.find((s) => s.value === shipping).price;
    const tax = subtotal * 0.08;
    return { subtotal, ship, tax, total: subtotal + ship + tax };
  }, [cart, shipping]);

  const setQty = (id, delta) =>
    setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)));

  const next = () => {
    setError('');
    if (active === 0 && cart.length === 0) return setError('Your cart is empty.');
    if (active === 2 && method === 'card') {
      if (!card.name.trim()) return setError('Enter the name on the card.');
      if (card.number.replace(/\s/g, '').length < 12) return setError('Card number looks too short.');
      if (!/^\d{2}\/\d{2}$/.test(card.expiry)) return setError('Expiry must be MM/YY.');
      if (!/^\d{3,4}$/.test(card.cvv)) return setError('CVV must be 3–4 digits.');
    }
    return setActive((s) => s + 1);
  };

  const summary = (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Price Details</Typography>
        {[['Subtotal', totals.subtotal], ['Shipping', totals.ship], ['Tax (8%)', totals.tax]].map(([l, v]) => (
          <Box key={l} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" color="text.secondary">{l}</Typography>
            <Typography variant="body2">{v === 0 ? 'Free' : money(v)}</Typography>
          </Box>
        ))}
        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ fontWeight: 600 }}>Total</Typography>
          <Typography sx={{ fontWeight: 600 }}>{money(totals.total)}</Typography>
        </Box>
      </CardContent>
    </Card>
  );

  const body = () => {
    if (active === 0) {
      return (
        <Box>
          {cart.length === 0 && <Typography color="text.secondary" sx={{ py: 3 }}>Your cart is empty.</Typography>}
          {cart.map((i) => (
            <Box key={i.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5, borderBottom: 1, borderColor: 'divider', flexWrap: 'wrap' }}>
              <Avatar variant="rounded" sx={{ bgcolor: `${i.color}.main`, width: 56, height: 56 }}>{i.name[0]}</Avatar>
              <Box sx={{ flexGrow: 1, minWidth: 140 }}>
                <Typography sx={{ fontWeight: 500 }}>{i.name}</Typography>
                <Typography variant="body2" color="text.secondary">Sold by {i.seller}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton size="small" onClick={() => setQty(i.id, -1)} aria-label="decrease"><Remove fontSize="small" /></IconButton>
                <Typography sx={{ width: 28, textAlign: 'center' }}>{i.qty}</Typography>
                <IconButton size="small" onClick={() => setQty(i.id, 1)} aria-label="increase"><Add fontSize="small" /></IconButton>
              </Box>
              <Typography sx={{ width: 80, textAlign: 'right' }}>{money(i.price * i.qty)}</Typography>
              <IconButton onClick={() => setCart((c) => c.filter((x) => x.id !== i.id))} aria-label="remove"><DeleteOutline /></IconButton>
            </Box>
          ))}
          {cart.length < START_CART.length && (
            <Button sx={{ mt: 1 }} onClick={() => setCart(START_CART)}>Restore cart</Button>
          )}
        </Box>
      );
    }
    if (active === 1) {
      return (
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Select an address</Typography>
          <RadioGroup value={address} onChange={(e) => setAddress(e.target.value)}>
            <Grid container spacing={2}>
              {ADDRESSES.map((a) => (
                <Grid key={a.id} size={{ xs: 12, sm: 6 }}>
                  <Card variant="outlined" sx={{ borderColor: address === a.id ? 'primary.main' : 'divider', height: '100%' }}>
                    <CardContent>
                      <FormControlLabel value={a.id} control={<Radio />} label={<Typography sx={{ fontWeight: 600 }}>{a.title}</Typography>} />
                      <Typography variant="body2" color="text.secondary">{a.text}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
          <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>Choose delivery speed</Typography>
          <RadioGroup value={shipping} onChange={(e) => setShipping(e.target.value)}>
            {SHIPPING.map((s) => (
              <FormControlLabel key={s.value} value={s.value} control={<Radio />} label={`${s.label} — ${s.price ? money(s.price) : 'Free'}`} />
            ))}
          </RadioGroup>
        </Box>
      );
    }
    if (active === 2) {
      return (
        <Box>
          <RadioGroup row value={method} onChange={(e) => setMethod(e.target.value)} sx={{ mb: 2 }}>
            <FormControlLabel value="card" control={<Radio />} label="Credit / Debit Card" />
            <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
          </RadioGroup>
          {method === 'card' ? (
            <>
              <Alert severity="info" sx={{ mb: 2 }}>Demo checkout — please don&apos;t enter a real card. Try 4242 4242 4242 4242.</Alert>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <TextField fullWidth label="Card Number" value={card.number} autoComplete="off"
                    onChange={(e) => setCard({ ...card, number: e.target.value.replace(/[^\d ]/g, '').slice(0, 19) })} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Name on Card" value={card.name} autoComplete="off" onChange={(e) => setCard({ ...card, name: e.target.value })} />
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <TextField fullWidth label="Expiry (MM/YY)" value={card.expiry} autoComplete="off" onChange={(e) => setCard({ ...card, expiry: e.target.value.slice(0, 5) })} />
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <TextField fullWidth label="CVV" value={card.cvv} autoComplete="off" onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })} />
                </Grid>
              </Grid>
            </>
          ) : (
            <Typography color="text.secondary">Pay {money(totals.total)} in cash when your order arrives.</Typography>
          )}
        </Box>
      );
    }
    const addr = ADDRESSES.find((a) => a.id === address);
    return (
      <Box sx={{ textAlign: 'center', py: 2 }}>
        <Typography variant="h5" sx={{ mb: 1 }}>Thank You! 😇</Typography>
        <Typography color="text.secondary">Your order <b>#{orderId}</b> has been placed (demo).</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Shipping to {addr.title}: {addr.text} · Paid by {method === 'card' ? `card ending ${card.number.replace(/\s/g, '').slice(-4)}` : 'cash on delivery'}
        </Typography>
        <Button variant="contained" onClick={() => { setActive(0); setCart(START_CART); setCard({ name: '', number: '', expiry: '', cvv: '' }); }}>
          Place another order
        </Button>
      </Box>
    );
  };

  return (
    <Box>
      <PageHeader title="Wizard Examples — Checkout" subtitle="A multi-step checkout with a live price summary. Nothing is charged or saved." />
      <Card>
        <CardContent>
          <Stepper activeStep={active} alternativeLabel sx={{ mb: 4 }}>
            {STEPS.map((s) => (
              <Step key={s.label}><StepLabel slots={{ stepIcon: StepIcon }}>{s.label}</StepLabel></Step>
            ))}
          </Stepper>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: active === 3 ? 12 : 8 }}>{body()}</Grid>
            {active < 3 && <Grid size={{ xs: 12, md: 4 }}>{summary}</Grid>}
          </Grid>
          {active < 3 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button variant="outlined" color="secondary" disabled={active === 0} onClick={() => { setError(''); setActive((s) => s - 1); }}>Previous</Button>
              <Button variant="contained" onClick={next}>{active === 2 ? 'Place Order' : 'Next'}</Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default WizardExamplesPage;

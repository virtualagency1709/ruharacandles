import OrderConfirmationPage from '../../order-confirmation/[orderNumber]/page';

export default function CheckoutSuccessPage() {
  return <OrderConfirmationPage params={{ orderNumber: 'RC-SUCCESS' }} />;
}

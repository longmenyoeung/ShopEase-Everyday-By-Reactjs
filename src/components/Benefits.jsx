import { Award, Headphones, RotateCcw, Truck } from 'lucide-react';

const benefits = [
  { icon: Truck, title: 'Shipping on us', description: 'On all orders over $75' },
  { icon: RotateCcw, title: 'Easy returns', description: '30 days to change your mind' },
  { icon: Award, title: 'Quality you’ll love', description: 'Good things, made to last' },
  { icon: Headphones, title: 'Here for you', description: 'Friendly support, 24/7' },
];

export default function Benefits() {
  return (
    <section className="benefits" aria-label="Shopping benefits">
      {benefits.map(({ icon: Icon, title, description }) => (
        <div className="benefit" key={title}>
          <Icon size={27} strokeWidth={1.4} />
          <div>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

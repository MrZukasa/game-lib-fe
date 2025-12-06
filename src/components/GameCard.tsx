// src/components/GameCard.tsx
interface GameCardProps {
  title: string;
  platform: string;
  image?: string;
}

export default function GameCard({ title, platform, image }: GameCardProps) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">
      {image && <img src={image} alt={title} className="w-full h-48 object-cover rounded mb-2" />}
      <h3 className="font-bold">{title}</h3>
      <p className="text-gray-500">{platform}</p>
    </div>
  );
}

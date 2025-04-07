import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

// type PriceType = {
//   name: string,
//   id: string,
//   price: number,
//   description: string,
//   items: string[],
//   paymentLink: string,
//   priceId: string,
// };

const plans = [
  {
    id: "basic",
    name: "Basic",
    description: "Perfect for occasional use",
    price: 9,
    items: ["5 PDF summaries", "Standard processing speed", "Email Support"],
    paymentLink: "",
    priceId: "",
  },
  {
    id: "pro",
    name: "Pro",
    price: 19,
    description: "For organization",
    items: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown Export",
    ],
    paymentLink: "",
    priceId: "",
  },
];

const PricingCard = () => {
  return (
    <div className="relative w-full max-w-lg hover:scale-105 hover:transition-all duration-300">
      <div
        className={cn(
          "relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 rounded-2xl border-[1px] border-gray-500/10",
          id === "pro" &&
            "border-rose-500 gap-2 border-2 shadow-2xl shadow-black/90"
        )}>
        <div className="flex justify-between gap-4 items-center">
          <div>
            <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
            <p className="text-base-content/80 mt-2">{description}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <p className="text-5xl tracking-tight font-bold">$ {price}</p>
          <div className="flex flex-col justify-end mb-[4px]">
            <p className=" text-xs uppercase font-semibold ">USD</p>
            <p className="text-xs">/month</p>
          </div>
        </div>

        <div className="space-y-2.5 leading-relaxed text-base flex-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <Check size={18} />
              <span> {item}</span>
            </li>
          ))}
        </div>

        <div className="space-y-2 flex justify-center w-full">
          <Link
            href={paymentLink}
            className={cn(
              "w-full rounded-full flex items-center justify-center bg-linear-to-r gap-2 py-2 from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 border-2 text-white transition transform-all duration-300",
              id === "pro"
                ? "border-rose-900"
                : "border-rose-100 from-rose-400 to-rose-500"
            )}>
            Buy Now <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

const PricingSection = () => {
  return (
    <section className="relative overflow-hidden " id="pricing">
      <div className="py-12 lg:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="flex justify-center items-center pb-12 w-full">
          <h2 className="uppercase font-bold text-2xl mb-8 text-rose-500">
            Pricing
          </h2>
        </div>
        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

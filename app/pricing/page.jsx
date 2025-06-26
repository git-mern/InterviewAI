import { plans } from "@/lib/plans";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

// Plan data

// Card Component — accepts a single plan as prop
const PricingCard = ({ id, name, description, price, items, paymentLink }) => {
  return (
    <div
      className={cn(
        "relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 rounded-2xl border-[1px] border-gray-500/10 hover:scale-105 hover:transition-all duration-300",
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
          <p className="text-xs uppercase font-semibold">USD</p>
          <p className="text-xs">/month</p>
        </div>
      </div>

      <ul className="space-y-2.5 leading-relaxed text-base flex-1">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <Check size={18} />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="space-y-2 flex justify-center w-full">
        <Link
          href={paymentLink}
          className={cn(
            "w-full rounded-full flex items-center justify-center bg-gradient-to-r gap-2 py-2 from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 border-2 text-black transition transform-all duration-300",
            id === "pro"
              ? "border-rose-900"
              : "border-rose-100 from-rose-400 to-rose-500"
          )}>
          Buy Now <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
};

// Section Component
const PricingSection = () => {
  return (
    <section className="relative overflow-hidden" id="pricing">
      <div>
        <Link
          href={"/"}
          className="flex gap-2 border w-fit px-2 py-1 rounded-md mt-5 ml-10 border-black hover:bg-black/10 transition transform ease-in-out duration-300">
          <ArrowLeft /> Back
        </Link>
      </div>
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

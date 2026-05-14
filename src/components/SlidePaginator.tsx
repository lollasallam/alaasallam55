import React, { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "../lib/utils";

export interface SlideProps {
  title: string;
  content: React.ReactNode;
}

export function SlidePaginator({ slides }: { slides: SlideProps[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Slide Progress */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-800">
          {slides[currentSlide].title}
        </h2>
        <div className="flex gap-2 text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          <span>{currentSlide + 1}</span>
          <span>من</span>
          <span>{slides.length}</span>
        </div>
      </div>

      <div className="flex gap-2 mb-8">
        {slides.map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === currentSlide ? "bg-pink-500 flex-1" : 
              index < currentSlide ? "bg-pink-200 w-8" : "bg-slate-200 w-8"
            )}
          />
        ))}
      </div>

      {/* Slide Content */}
      <div className="flex-1 animate-in fade-in slide-in-from-right-8 duration-500 min-h-[300px]">
        {slides[currentSlide].content}
      </div>

      {/* Slide Controls */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition",
            currentSlide === 0
              ? "opacity-50 cursor-not-allowed bg-slate-100 text-slate-400"
              : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
          )}
        >
          <ArrowRight className="w-5 h-5" />
          <span>القسم السابق</span>
        </button>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition",
            currentSlide === slides.length - 1
              ? "opacity-50 cursor-not-allowed bg-pink-100 text-pink-400"
              : "bg-pink-600 hover:bg-pink-700 text-white shadow-md hover:shadow-lg"
          )}
        >
          <span>{currentSlide === slides.length - 2 ? "القسم الأخير" : "القسم التالي"}</span>
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>
      
      {currentSlide === slides.length - 1 && (
        <div className="mt-8 bg-green-50 text-green-700 p-4 rounded-2xl flex items-start gap-4 border border-green-100 animate-in fade-in zoom-in duration-500">
          <CheckCircle2 className="w-6 h-6 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-bold mb-1">أحسنتِ!</h4>
            <p className="text-sm opacity-90">لقد أتممتِ قراءة هذا المحور بنجاح. يمكنكِ الآن الانتقال للمحور التالي من الأسفل.</p>
          </div>
        </div>
      )}
    </div>
  );
}

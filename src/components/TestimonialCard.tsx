
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  content: string;
  rating: number;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <Card className="overflow-hidden card-hover shadow bg-card dark:bg-card/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-12 w-12 rounded-full overflow-hidden">
            <img 
              src={testimonial.avatar} 
              alt={testimonial.name} 
              className="h-full w-full object-cover"
            />
          </div>
          
          <div>
            <h4 className="font-medium">{testimonial.name}</h4>
            <p className="text-muted-foreground text-sm">{testimonial.role}</p>
          </div>
        </div>
        
        <div className="flex mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg 
              key={i}
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill={i < testimonial.rating ? "currentColor" : "none"} 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={`${i < testimonial.rating ? 'text-primary' : 'text-muted-foreground'} mr-1`}
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>
        
        <p className="text-muted-foreground">"{testimonial.content}"</p>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;

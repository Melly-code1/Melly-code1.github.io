import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  stars: number;
}

export default function SuccessModal({ isOpen, onClose, onContinue, stars }: SuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto bg-white rounded-3xl p-8 text-center border-0">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-fredoka text-gray-800 mb-2">Great Job!</h3>
        <p className="text-gray-600 mb-6">You got it right! Keep up the amazing work.</p>
        
        <div className="flex justify-center space-x-2 mb-6">
          {Array.from({ length: stars }, (_, i) => (
            <Star key={i} className="w-8 h-8 text-yellow-400 fill-current animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
        
        <Button 
          className="bg-gradient-to-r from-coral to-turquoise text-white font-fredoka py-3 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 w-full"
          onClick={onContinue}
        >
          Continue
        </Button>
      </DialogContent>
    </Dialog>
  );
}

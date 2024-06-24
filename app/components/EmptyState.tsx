'use client';

import { useRouter } from "next/navigation";

import Button from "./Button";
import Heading from "./Heading";
import { FaExclamationTriangle } from "react-icons/fa";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters.",
  showReset
}) => {
  const router = useRouter();

  return ( 
    <div 
      className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      "
    >
      <Heading
        center
        title={title}
        subtitle={subtitle}
      />
      <div className="w-64 mt-4">
        {showReset && (
          <Button
            outline
            label="Remove filters"
            icon={FaExclamationTriangle}
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
   );
}
 
export default EmptyState;
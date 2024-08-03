import { RotateCw } from "lucide-react";

const loading = () => {
  return (
    <div className="flex w-full h-[80vh] items-center  justify-center animate-spin">
      <RotateCw size={30} />
    </div>
  );
};

export default loading;

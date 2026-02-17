import { useState } from "react";
import ContractUpload from "./ContractUpload";
import ContractParameters from "./ContractParameters";

const ContractPage = () => {

  const [contratData, setContratData] = useState<any>(null);

  return (
    <div className="container mx-auto p-6">

      <ContractUpload onUploadComplete={(data) => setContratData(data)} />

     
      <ContractParameters contratData={contratData} isVisible={!!contratData} />
    </div>
  );
};

export default ContractPage;

import Modal from '../../components/ui/Modal'; // Adjusted path

// import SchematicComponent from "@/components/schematic/SchematicComponent";

function ManagePlan() {
  return (
    <Modal isOpen={true}>
      <div className="container mx-auto p-4 md:p-0 text-center"> {/* Added text-center for "Coming soon" */}
        <h1 className="text-2xl font-bold mb-4 my-8">Manage Your Plan</h1>
        <p className="text-gray-600 mb-8">
          Manage your subscription and billing details here.
        </p>
        <h2>Coming soon</h2>

        {/* <SchematicComponent componentId="cmpn_4ShecskXt6P" /> */}
      </div>
    </Modal>
  );
}

export default ManagePlan;

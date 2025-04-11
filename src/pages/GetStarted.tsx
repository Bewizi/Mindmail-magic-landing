import AudioGenerator from "@/components/AudioGenerator";
import Footer from "@/components/Footer";
import GenerateImage from "@/components/GenerateImage";
import NavBar from "@/components/NavBar";

const GetStarted = () => {
  return (
    <section className="min-h-screen bg-background text-foreground flex flex-col ">
      <NavBar />
      <main className="flex-grow pt-24 pb-16 px-4 md:px-6">
        <div>
          <section className="max-w-5xl mx-auto mb-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">
                Your Quantum{" "}
                <span className="text-purple-500">Affirmations</span>
              </h1>
              <p className="text-gray-300">
                Shape your reality with focused consciousness
              </p>
            </div>

            <div className="bg-gray-900 bg-opacity-60 p-4 rounded-lg"></div>
          </section>
          <div className="flex justify-center flex-col gap-5 lg:flex-row lg:justify-evenly ">
            <AudioGenerator />
            <GenerateImage />
          </div>
        </div>
      </main>
      <Footer />
    </section>
  );
};

export default GetStarted;

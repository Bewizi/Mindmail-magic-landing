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
          <h1 className="text-4xl font-bold text-center mb-8">Get Started</h1>
          <p className="text-lg text-center mb-4">
            Ready to unlock the universe's secrets? Let's get started!
          </p>
          <div className="flex justify-center flex-wrap lg:flex-row lg:justify-evenly ">
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

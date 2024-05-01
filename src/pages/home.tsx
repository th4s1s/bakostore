import { Link } from 'react-router-dom';
import Iconify from '../components/iconify';

const HomePage: React.FC = () => {
  return (
    <>
    <section className="relative w-full mt-0 lg:py-44 overflow-hidden z-1 flex items-start justify-center">
      <div className="container">
        <div className="relative grid md:grid-cols-12 grid-cols-1 items-center mt-10 gap-[30px]">
          <div className="md:col-span-7">
            <div className="md:mr-6">
              <h4 className="font-bold lg:leading-normal leading-normal text-4xl lg:text-5xl mb-5 text-black dark:text-white relative">
                Buy Your Favorite Manga <span className="after:absolute after:right-0 after:left-0 after:bottom-3 after:lg:h-3 after:h-2 after:w-auto after:rounded-md after:bg-indigo-600/30 relative text-pink-200">
                  At Home
                </span>
              </h4>
              <p className="text-slate-400 text-lg max-w-xl">
                Welcome to Bako, your charming destination for manga delights! Dive into our vibrant selection of Japanese comics, featuring both beloved classics and fresh releases. Explore an atmosphere that promises joy and sparks your imagination with every visit. Discover your next favorite story at Bako today!
              </p>
              <div className="relative mt-8">
              <Link
                to='/'
                className="btn bg-pink-200 hover:bg-pink-300 border-pink-200 hover:border-pink-300 hover:text-white text-black rounded-full mr-2 text-xl px-6 py-3 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                style={{
                  fontFamily: '"Caveat", cursive',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.1)' 
                }}
              >
                Buy Now 🎀
              </Link>
            </div>
            </div>
          </div>
          {/*end col*/}
          <div className="md:col-span-5">
            <div className="relative after:content-[''] after:absolute after:h-32 after:w-32 after:bg-indigo-600/5 after:top-16 after:left-0 after:-z-1 after:rounded-3xl after:animate-[spin_10s_linear_infinite]">
              <img
                src="/hero.webp"
                className="lg:max-w-none md:max-w-md"
                style={{ width: '400px', height: '400px' }}
              />
            </div>
          </div>
          {/*end col*/}
          <div className="overflow-hidden after:content-[''] after:absolute after:h-32 after:w-32 after:bg-indigo-600/5 after:top-16 after:left-0 after:-z-1 after:rounded-3xl after:animate-[spin_10s_linear_infinite]" />
        </div>
        {/*end grid*/}
      </div>
      {/*end container*/}
    </section>

    <section
  className="relative md:py-24 py-16 bg-gray-50 dark:bg-slate-800"
  id="features"
>
  <div className="container lg mx-auto">
    <div className="grid grid-cols-1 pb-8 text-center">
      <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
        Discover Bako
      </h3>
      <p className="text-slate-400 max-w-xl mx-auto">
        Step into a world where every page turns into an adventure. At Bako, we bring stories to life!
      </p>
    </div>
    {/*end grid*/}
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-4 gap-[30px]">
      {/* Content */}
      <div className="group relative lg:px-6 mt-4 transition duration-500 ease-in-out rounded-xl overflow-hidden text-center">
        <div className="relative overflow-hidden text-transparent -m-3">
          <div className="h-28 w-28 text-pink-300 mx-auto rotate-[30deg]" />
          <div className="absolute top-2/4 -translate-y-2/4 left-0 right-0 mx-auto text-pink-500 rounded-xl transition duration-500 ease-in-out text-3xl flex align-middle justify-center items-center">
            <Iconify icon="emojione-v1:sparkling-heart" />
          </div>
        </div>
        <div className="mt-6">
          <a
            href="#"
            className="text-xl font-medium hover:text-pink-500 duration-500 ease-in-out"
          >
            Manga Love
          </a>
          <p className="text-slate-400 transition duration-500 ease-in-out mt-3">
            Explore a treasure trove of manga collections where every genre from shojo to shonen thrives.
          </p>
        </div>
      </div>
      {/* Content */}
      {/* Content */}
      <div className="group relative lg:px-6 mt-4 transition duration-500 ease-in-out rounded-xl overflow-hidden text-center">
        <div className="relative overflow-hidden text-transparent -m-3">
          <div className="h-28 w-28 text-pink-300 mx-auto rotate-[30deg]" />
          <div className="absolute top-2/4 -translate-y-2/4 left-0 right-0 mx-auto text-pink-500 rounded-xl transition duration-500 ease-in-out text-3xl flex align-middle justify-center items-center">
            <Iconify icon="icon-park-outline:group" />
          </div>
        </div>
        <div className="mt-6">
          <a
            href="#"
            className="text-xl font-medium hover:text-pink-500 duration-500 ease-in-out"
          >
            Community Corner
          </a>
          <p className="text-slate-400 transition duration-500 ease-in-out mt-3">
            Dive into discussions, fan art, and creator spotlights. Bako is your community for all things manga!
          </p>
        </div>
      </div>
      {/* Content */}
      {/* Content */}
      <div className="group relative lg:px-6 mt-4 transition duration-500 ease-in-out rounded-xl overflow-hidden text-center">
        <div className="relative overflow-hidden text-transparent -m-3">
          <div className="h-28 w-28 text-pink-300 mx-auto rotate-[30deg]" />
          <div className="absolute top-2/4 -translate-y-2/4 left-0 right-0 mx-auto text-pink-500 rounded-xl transition duration-500 ease-in-out text-3xl flex align-middle justify-center items-center">
            <Iconify icon="mdi:charity" />
          </div>
        </div>
        <div className="mt-6">
          <a
            href="#"
            className="text-xl font-medium hover:text-pink-500 duration-500 ease-in-out"
          >
            Non-Profit Nook
          </a>
          <p className="text-slate-400 transition duration-500 ease-in-out mt-3">
            At Bako, we believe in the spirit of giving. Every purchase supports community projects and artist collaborations.
          </p>
        </div>
      </div>
      {/* Content */}
    </div>
    {/*end grid*/}
  </div>
  {/*end container*/}
  <div className="container ml-20 md:mt-24 mt-16">
    <div className="grid md:grid-cols-2 grid-cols-1 items-center mt-16 gap-[30px]">
      <div className="relative order-2 md:order-1">
      <div className="relative order-2 md:order-1">
      <img
        src='/context.webp'
        className="rounded-lg shadow-md dark:shadow-gray-800"
        alt="Context"
      />
        </div>
      </div>
      <div className="lg:ml-8 mt-8 md:mt-0 order-1 md:order-2">
        <h4 className="mb-4 text-2xl md:leading-normal leading-normal font-semibold">
          Bako's Story
        </h4>
        <p className="text-slate-400">
          Born from a love of manga and a wish to unite fans, Bako stands as a beacon for community and creativity in the manga world.
        </p>
        <div className="mt-4">
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            className="btn btn-link text-pink-600 hover:text-pink-600 after:bg-pink-600 duration-500 ease-in-out"
          >
            Our Journey
          </a>
        </div>
      </div>
    </div>
    {/*end grid*/}
  </div>
  {/*end container*/}
</section>

    </>
  );
};

export default HomePage;
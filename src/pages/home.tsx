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
                Mua những cuốn Manga, LN yêu thích của bạn <span className="relative text-pink-200">
                tại nhà
                </span>
              </h4>
              <p className="text-slate-400 text-lg max-w-xl">
              Tại Bako, mỗi quyển manga không chỉ là một cuốn sách; chúng là cánh cửa dẫn vào những thế giới kỳ diệu, nơi mỗi trang truyện là một cuộc phiêu lưu mới. Với lòng đam mê cháy bỏng dành cho manga và sự tận tâm trong từng tác phẩm, Bako cam kết mang đến cho bạn những trải nghiệm mua sách đặc sắc và đầy cảm hứng.
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
                Mua Ngay 🎀
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
  className="relative md:py-24 py-16 bg-gray-50"
  id="features"
>
  <div className="container lg mx-auto">
    <div className="grid grid-cols-1 pb-8 text-center">
      <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
       Khám Phá Bako
      </h3>
      <p className="text-slate-400 max-w-xl mx-auto">
        Bước vào thế giới mà mỗi trang sách mở ra một cuộc phiêu lưu. Tại Bako, chúng tôi làm sống dậy những câu chuyện!
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
            Manga Đa Dạng
          </a>
          <p className="text-slate-400 transition duration-500 ease-in-out mt-3">
          Khám phá kho tàng manga đa dạng, nơi bán mọi thể loại từ shojo đến yuri.
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
            Góc Cộng Đồng
          </a>
          <p className="text-slate-400 transition duration-500 ease-in-out mt-3">
          Tham gia vào các cuộc thảo luận của người hâm mộ, và tìm hiểu về các tác giả. Bako là cộng đồng của bạn cho mọi thứ về manga, LN!
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
            Không Lợi Nhuận
          </a>
          <p className="text-slate-400 transition duration-500 ease-in-out mt-3">
          Tại Bako, chúng tôi nói không với ăn chặn. Tất cả lợi nhuận sẽ được hoàn trả lại cho tác giả.
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
        className="rounded-lg shadow-md "
        alt="Context"
      />
        </div>
      </div>
      <div className="lg:ml-8 mt-8 md:mt-0 order-1 md:order-2">
        <h4 className="mb-4 text-2xl md:leading-normal leading-normal font-semibold">
          Câu truyện của chúng tôi
        </h4>
        <p className="text-slate-400">
          Được sinh ra từ tình yêu đằm thấm đối với Manga và LN, chúng tôi mong muốn lan tỏa tình yêu này đến với mọi người trên khắp mọi miền tổ quốc.
        </p>
        <div className="mt-4">
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            className="btn btn-link text-pink-600 hover:text-pink-600 after:bg-pink-600 duration-500 ease-in-out"
          >
            Xem hành trình chúng tôi tại đây
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
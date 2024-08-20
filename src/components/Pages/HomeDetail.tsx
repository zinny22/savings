import Top4List from '../Organisms/Top4List';

function HomeDetail() {
  return (
    <div className="h-[100vh] min-w-[400px] w-full pt-[58px]">
      <section className="flex gap-x-6 px-[180px]">
        <div className="flex-1 bg-[#2972FF] rounded-xl p-12 text-white text-[28px] font-bold cursor-pointer">
          나에게
          <br />
          맞는 예적금은?
        </div>
        <div>???</div>

        <Top4List />
      </section>
    </div>
  );
}

export default HomeDetail;

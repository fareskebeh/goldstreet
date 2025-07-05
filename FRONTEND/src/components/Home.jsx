import SplitText from "../bits/SplitText";
import ShinyText from "../bits/ShinyText";

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};


const Home = () => {
  return (
    <div className='p-4 flex flex-col gap-4'>
      <SplitText text="Ready to start your journey in the trading realm?"
      className="text-5xl sm:text-5xl md:text-5xl lg:text-7xl leading-relaxed font-bold text-left"
      delay={100}
      duration={0.6}
      ease="power3.out"
      splitType="words"
      from={{ opacity: 0, y: 40 }}
      to={{ opacity: 1, y: 0 }}
      threshold={0.1}
      rootMargin="-100px"/>
      <ShinyText text="Gold Street has you covered" disabled={false} speed={3} className='text-2xl sm:text-4xl' />
    </div>
  )
}

export default Home

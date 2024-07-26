import heroImg from '../assets/hero.png';

const Hero = () => {
  return (
    <div>
        <img src={heroImg} className='w-full max-h-[600px] object-cover' alt="Image of tasty burger" />
    </div>
  )
}

export default Hero;
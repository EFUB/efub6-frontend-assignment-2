import Image from 'next/image';

export default function ContactPage() {
  return (
    <div>
      <h1>Contact</h1>
      <p>Email: nanayoung20@ewha.ac.kr</p>
      
      <div style={{ marginTop: '20px' }}>
        <p>thank you</p>
        <Image
          src="/contact.jpeg"
          alt="Next.js Logo"
          width={150}
          height={150}
          priority
        />
      </div>
    </div>
  );
}
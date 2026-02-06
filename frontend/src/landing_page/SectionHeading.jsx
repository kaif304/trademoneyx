function SectionHeading({ text }) {
  return (
    <h1 className={`text-xl sm:text-2xl lg:text-3xl font-semibold text-black mb-4 mt-2`}>
      {text}
    </h1>
  );
}
export default SectionHeading;
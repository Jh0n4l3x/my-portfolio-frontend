export function About() {
  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-bold mb-8">About Me</h1>
      <div className="max-w-3xl">
        <p className="text-lg text-gray-700 mb-6">
          I'm a passionate Full Stack Developer with expertise in modern web technologies.
        </p>
        <h2 className="text-2xl font-bold mb-4">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {['TypeScript', 'React', 'NestJS', 'Node.js', 'MongoDB', 'Docker'].map((skill) => (
            <div key={skill} className="bg-gray-100 p-4 rounded-lg text-center">
              {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

//fake database

const db = {
  themes: [
    {
      name: 'default',
      min_level: 0,
      questions: [
        {
          id: 0,
          statements: [
            {
              statement: 'The blue whale is the largest creature on earth.. ',
              disproof:
                "Because a mushroom known as Armillaria ostogae is actually bigger. It's mycelium area is over 800 ha.",
            },
            {
              statement: "It's heart weighs ~1000 kg. ",
              disproof: false,
            },
          ],
        },
      ],
      icon: 'D',
    },
  ],
};

export default db;

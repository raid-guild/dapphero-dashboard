const createHtmlTemplate = (children) => `
<!DOCTYPE html>

<html lang="en">
  <head>
    <title>DappHero HTML Generation</title>

    <meta charset="UTF-8" />
    <meta name="author" content="DappHero" />
    <meta name="description" content="DappHero" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://unpkg.com/mvp.css" />
  </head>

  <body>
    ${children}
  </body>

</html>
`;

module.exports = { createHtmlTemplate };

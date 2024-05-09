const emailTemplate = (otp, name) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Template</title>
        <style>
            .max-w-2xl {
                max-width: 42rem;
            }
            .px-6 {
                padding-left: 1.5rem;
                padding-right: 1.5rem;
            }
            .py-8 {
                padding-top: 2rem;
                padding-bottom: 2rem;
            }
            /* Add more Tailwind CSS classes here and convert them to inline styles */
        </style>
    </head>
    <body>
        <section style="max-width: 42rem; padding-left: 1.5rem; padding-right: 1.5rem; padding-top: 2rem; padding-bottom: 2rem;" >
            <header>
                <a href="#">
                    <img style="width: auto; height: 1.75rem; max-height: 2rem;" src="https://merakiui.com/images/full-logo.svg" alt=""/>
                </a>
            </header>

            <main style="margin-top: 2rem;">
                <h2 style="color: #4b5563;">Hi ${name},</h2>

                <p style="margin-top: 0.5rem; line-height: 1.625; color: #4b5563;">This is your verification code:</p>

                <h1>${otp}</h1>

                <p style="margin-top: 1rem; line-height: 1.625; color: #4b5563;">This code will only be valid for the next 5 minutes. If the code does not work, you can use this login verification link:</p>
                
                
                <p style="margin-top: 2rem; line-height: 1.625; color: #4b5563;">
                    Thanks, <br/>
                    Workers Hive Team
                </p>
            </main>

        </section>
    </body>
    </html>
    `;
};

module.exports = { emailTemplate };

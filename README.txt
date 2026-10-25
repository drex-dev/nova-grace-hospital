NOVA GRACE HOSPITAL WEBSITE
===========================
Clean URLs: /  /about  /services  /doctors  /team  /treatment  /appointment  /contact
(/home redirects to /, and any /page.html redirects to /page)

UPLOAD: copy everything in this folder (including the hidden .htaccess file) to the
website root (public_html or wwwroot). The right config is picked up automatically:
  - Apache / cPanel / Hostinger ........ .htaccess
  - Windows IIS / ASP.NET hosting ...... web.config (needs the IIS URL Rewrite module)
  - Vercel ............................. vercel.json
  - Netlify ............................ _redirects (Netlify hides .html by default)

PREVIEW ON YOUR MAC: open Terminal in this folder and run
    npx serve .
then visit http://localhost:3000/about  (serve supports clean URLs).
Opening the .html files by double-clicking will NOT work, because links use /about style paths.

FORMS: the appointment and contact forms only show a confirmation on the page.
Connect them to an email service or the hospital's backend before going live.

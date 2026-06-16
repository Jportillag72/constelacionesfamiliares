[README.md](https://github.com/user-attachments/files/28993966/README.md)
# Amor Escobio Suárez - Landing Page

Landing page estática para Amor Escobio Suárez, enfocada en constelaciones familiares, sesiones online, encuentros presenciales en Lugones y formación.

## Contenido

- Hero con CTA principal por email.
- Sección "Quién soy".
- Servicios: constelaciones grupales, sesión individual, sesiones online, presencial en Lugones y formación.
- Bloque "Cómo funciona".
- Curso destacado editable desde Admin.
- Preguntas frecuentes.
- Contacto y footer con dirección.
- Páginas legales: Aviso Legal, Política de Privacidad y Cookies.

## Estructura

```text
.
├── index.html
├── cms.html
├── aviso-legal.html
├── politica-privacidad.html
├── cookies.html
├── styles.css
├── script.js
├── content.js
├── cms.js
└── assets/
    ├── hero-constelaciones.png
    └── course-formacion.png
```

## Uso local

Abre `index.html` directamente en el navegador.

Para editar los datos del curso, abre `cms.html`, inicia sesión en Admin y modifica fecha, lugar, modalidad, texto y enlace del CTA. Los cambios se guardan en el almacenamiento local del navegador.

## Admin

El acceso de Admin está pensado para una landing estática y funciona en el navegador. No sustituye a una autenticación real de servidor.

Si esta web se publica en GitHub Pages u otro hosting estático, el código del Admin será visible para cualquier persona con conocimientos técnicos. Para un CMS seguro en producción conviene usar un backend, Netlify CMS/Decap CMS, TinaCMS, WordPress, Webflow, Squarespace u otra solución con autenticación real.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub.
2. Sube todos los archivos de esta carpeta.
3. En GitHub, entra en `Settings` -> `Pages`.
4. En `Build and deployment`, selecciona `Deploy from a branch`.
5. Elige la rama `main` y la carpeta raíz `/`.
6. Guarda los cambios.

GitHub Pages publicará la web con una URL parecida a:

```text
https://TU-USUARIO.github.io/NOMBRE-DEL-REPOSITORIO/
```

## Comandos útiles

```bash
git init
git add .
git commit -m "Landing Amor Escobio Suarez"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/NOMBRE-DEL-REPOSITORIO.git
git push -u origin main
```

## Personalización

- Edita textos principales en `index.html`.
- Edita estilos en `styles.css`.
- Sustituye imágenes en `assets/`.
- Ajusta el contenido por defecto del curso en `content.js`.
- Cambia el comportamiento del menú y render del curso en `script.js`.
- Cambia la lógica del Admin en `cms.js`.

## Datos de contacto actuales

- Email: `amorescobiosuarez@gmail.com`
- Dirección: `C/ Puerto Pajares 5, Lugones (Siero) 33420`
- Instagram: `https://www.instagram.com/amor.escobio/`

## Nota legal

Los textos de Aviso Legal, Política de Privacidad y Cookies son una base orientativa. Antes de publicar la web de forma definitiva, conviene revisar y completar los datos legales pendientes, especialmente NIF/CIF y cualquier información específica sobre proveedores, alojamiento, formularios, analítica o cookies.

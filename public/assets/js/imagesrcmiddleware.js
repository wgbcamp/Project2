// Gonna need this later. Image src will be instered after multer creates the file name, and we'll send 'data' in the post request as
// the image link. This is so that handlebars can read the image link later

data = {
    img_src: base64img.base64Sync('./assets/img/test.png');
  }


//   and here's how the handlebars page will look

{{#if img_src}}
    <img src="{{{img_src}}}" alt=""/>
{{/if}}
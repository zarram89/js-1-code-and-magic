const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.upload input[type=file]');
const preview = document.querySelector('.setup-user-pic');
const userModalOpenElementPreview = document.querySelector('.setup-open-icon');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  console.log(file);
  console.log(fileName);

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
    userModalOpenElementPreview.src = URL.createObjectURL(file);
  }
});

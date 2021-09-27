const campoRequerido = (valor) => {
  if (valor.trim() === "") {
    return false;
  } else {
    return true;
  }
};

const rangoValor = (valor) => {
  if (valor > 0 && valor < 5000) {
    return true;
  } else {
    return false;
  }
};

export { campoRequerido, rangoValor };

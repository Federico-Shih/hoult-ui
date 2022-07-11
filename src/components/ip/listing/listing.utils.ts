export const renderPorts = (ports: number[]) => {
  const arr = [];
  for (let i = 0; i < ports.length; i += 1) {
    if (i !== 0) {
      arr.push(', ');
    }
    arr.push(`${ports[i]}`);
  }
  return arr.join('');
};

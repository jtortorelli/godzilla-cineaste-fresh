const n: number = parseInt(Deno.args[0]);
const s: string[] = [];

for (let i = 1; i <= n; i++) {
  s.push(i.toString());
}

s.sort();

console.log(s.join("\r\n"));

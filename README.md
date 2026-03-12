# Atormentadas

Extensao do Owlbear Rodeo para trilhas compartilhadas com varias OSTs simultaneas e audio espacial por token.

## Publicar no GitHub Pages
1. Suba este projeto para um repositorio no GitHub.
2. Garanta que a branch principal seja `main`.
3. Envie o arquivo de workflow em `.github/workflows/deploy-pages.yml`.
4. No GitHub, abra `Settings > Pages` e deixe `Build and deployment` em `GitHub Actions`.
5. FaÃ§a push para `main`.
6. Quando o workflow terminar, sua extensao ficara em uma URL como `https://SEU-USUARIO.github.io/NOME-DO-REPO/manifest.json`.
7. Use essa URL no `Add Extension` do Owlbear.

## Observacoes
- O Owlbear precisa de uma URL publica HTTPS para todos os jogadores carregarem a extensao.
- `localhost` funciona so no seu computador.
- Este projeto foi ajustado para usar caminhos relativos, entao funciona melhor em GitHub Pages de repositorio.

## Teste local
1. Rode `npm.cmd run build`.
2. Rode `& "C:\Program Files\nodejs\node.exe" .\serve-dist.mjs 4175`.
3. Abra `http://localhost:4175/manifest.json`.

## GitHub Pages atual
- URL do site: https://douglaskaua750-cyber.github.io/atormentadas/
- URL do manifest: https://douglaskaua750-cyber.github.io/atormentadas/manifest.json

Se o Owlbear nao carregar, confirme que o deploy do GitHub Pages ja refletiu o manifest novo antes de testar novamente.
## Narrativa

```
Como um cliente
Quero que o sistema me gere urls curtas a partir de urls longas
Para facilitar o envio de urls
```

### Cenários

```
Dado que não exista a url longa salva no BD
Quando o cliente solicitar uma url curta
Então o sistema deve gerar um hash
    E retornar esse hash
    E salvar esse hash no BD

Dado que existe a url longa no BD
Quando o cliente solicitar uma url curta
Então o sistema retorna o hash salvo no BD


Dado que a hash está salva no BD
Quando o cliente acessar a url curta
Então o sistema deve redirecionar a página para a url longa

Dado que a hash não está salva no BD
Quando o cliente acessar a url curta
Então o sistema deve informa que a página não foi encontrada.
```

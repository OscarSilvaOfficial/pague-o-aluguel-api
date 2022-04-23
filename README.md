# Pague o aluguel api

## Idéia da aplicação
Essa aplicação serve para controle e notificação de contas que precisam ser pagas.

### As funcionalidades devem ser:

* Criação de sessão, onde engloba todas as contas correspondentes a um assunto
* Criação de conta que deverá ser inserida em alguma sessão, e deve conter o seguintes dados
  * descrição
  * data de vencimento
  * valor
  * quantidade de parcelas total
  * quantidade de parcelas pagas 

## Entidades

### `PaymentSession`
```typescript
class BillingGrouping {
  id: number;
  name: string;
  description: string;
  billings: Billing[];
}
```

### `Billing`
```typescript
class Billing {
  id: number;
  description: string;
  dueDate: Date;
  amount: number;
  status: BillingStatus;
  totalNumberOfInstallments: number;
  totalOfInstallmentsPaid: number;
}
```

## Modelo de desenvolvimento e Arquitetura

Grande parte dos conceitos, arquiteturas e práticas de desenvolvimento usado nesse repositório pode ser visualizado no vídeo [Clean Architecture](https://www.youtube.com/watch?v=BuSf7VsH064) do canal [Full Cycle](https://www.youtube.com/channel/UCMUoZehUZBhLb8XaTc8TQrA) com o palestrante [Rodrigo Bramas](https://www.youtube.com/channel/UCkqOofjb7nl6V8vXrIbGtiQ).

Além disso, todas as referências de procedimentos e boas práticas usados até agora estão abaixo:

### Links
* [Git Flow](https://medium.com/trainingcenter/utilizando-o-fluxo-git-flow-e63d5e0d5e04)
* [Clean Code](https://balta.io/blog/clean-code)
* [SOLID](https://medium.com/desenvolvendo-com-paixao/o-que-%C3%A9-solid-o-guia-completo-para-voc%C3%AA-entender-os-5-princ%C3%ADpios-da-poo-2b937b3fc530)
* [TDD](https://www.youtube.com/watch?v=sg1zFpNM5Jw)
* [Clean Achitecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

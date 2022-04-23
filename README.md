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

### Fluxo inícial

> Criar sessão -> Inclusão de N contas

> obs: esse fluxo está sujeito a mudança


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

Grande parte dos conceitos, arquiteturas e práticas de desenvolvimento usado nesse repositório pode ser visualizado nesse vídeo da FullCycle com o palestrante Rodrigo Bramas.

Além disso, todas as referências de procedimentos e boas práticas estão abaixo:

### Links
* [Git Flow](https://medium.com/trainingcenter/utilizando-o-fluxo-git-flow-e63d5e0d5e04)
* [Clean Code](https://balta.io/blog/clean-code)
* [Clean Architecture](https://www.youtube.com/watch?v=BuSf7VsH064)

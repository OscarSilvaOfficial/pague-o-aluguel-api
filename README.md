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

Criar sessão -> Inclusão de N contas
obs: esse fluxo está sujeito a mudança


## Entidades

### `PaymentSession`
```typescript
class PaymentSession {
  id: number;
  name: string;
  description: string;
  totalPaid: number;
  totalRemaining: number;
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
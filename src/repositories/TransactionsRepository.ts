import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
//Manipulação de dados da persistência de dados fica aqui
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (sum: Balance,transaction: Transaction) => {
        switch(transaction.type){
          case 'income':
            sum.income += transaction.value;
            break;
          case 'outcome':
            sum.outcome += transaction.value; 
        }
        sum.total = sum.income - sum.outcome;
       return sum;
      }, 
      {
        income: 0,
        outcome: 0,
        total: 0,
      }
    )
    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ value, type, title });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;

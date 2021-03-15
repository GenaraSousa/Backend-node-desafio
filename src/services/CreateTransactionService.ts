import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';


// Parte de regras de negócio da criação de transação fica aqui
interface dataTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
} 

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title,type,value}: dataTransaction): Transaction {
    const transaction = this.transactionsRepository.create({title, value, type});
    if(type === 'outcome'){
      const balance = this.transactionsRepository.getBalance();
      if(balance.total < value){
        throw Error('The outcome value exceeds the limit of the total.');
      }
    }
    return transaction;
  }
}

export default CreateTransactionService;

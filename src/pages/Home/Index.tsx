import { HandPalm, Play } from "phosphor-react";
import { 
  HomeContainer,
  StartCountButton,
  StopCountButton,
} from "./styles";
import { useContext } from "react";
import { NewCycleForm } from './components/NewCycleForm/index';
import { CountDown } from "./components/Countdown";
import * as zod from 'zod';
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { CyclesContext } from "../../contexts/CyclesContext";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O ciclo precisa ser de no mínimo 5 minutos")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos")
})

type NewCycleFormData = Zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const {activeCycle, createNewCycle, interruptCurrentCycle} = useContext(CyclesContext);
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  });
  const { handleSubmit, watch, reset } = newCycleForm;

  function handleCreateNewCycle(data: NewCycleFormData){
    createNewCycle(data);
    reset();
  }

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <CountDown />
        {activeCycle ? (
          <StopCountButton type="button" onClick={interruptCurrentCycle}>
          <HandPalm size={24}/>
          Interromper
        </StopCountButton>
        ) : (
        <StartCountButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24}/>
          Começar
        </StartCountButton>)}
      </form>
    </HomeContainer>
  )
}
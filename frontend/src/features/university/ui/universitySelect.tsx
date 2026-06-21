import { EModalVariables } from "@/shared/lib/utils/modalVariables";
import { useActions } from "@/shared/hooks/useActions";
import debounce from "lodash/debounce";
import { Combobox } from "@/shared/ui/combobox/combobox";
import { useUniversitySuggestions } from "@/entities/university/hooks/useUniversitySuggestions";

export const UniversitySelect = () => {
  const { setOpenModal } = useActions();

  const {
    mutate: fetchUniversitySuggestions,
    selectData,
    data,
  } = useUniversitySuggestions();

  const handleChangeUniversity = (value: string) => {
    const selectUniversity = data?.find((item) => item.value.trim() === value);

    if (!selectUniversity) return;
    setOpenModal({
      isOpen: true,
      type: EModalVariables.SCHEDULE_ACCEPT_MODAL,
      data: {
        onUniversitySelect: (universityId: string) => {
          console.log(universityId);
          setOpenModal({
            isOpen: true,
            type: EModalVariables.GROUP_CREATE_MODAL,
            data: {
              universityId,
            },
          });
        },
        selectUniversity,
      },
    });
  };

  const fetchSuggestions = debounce((value: string) => {
    if (!value) return;

    fetchUniversitySuggestions({ universityName: value });
  }, 300);

  return (
    <div className="bg-white p-5 rounded-2xl space-y-2">
      <h2 className="text-base">Выберите ваш ВУЗ или колледж</h2>
      <Combobox
        options={selectData ?? []}
        onChangeValue={handleChangeUniversity}
        onChangeSearchValue={fetchSuggestions}
      />
    </div>
  );
};

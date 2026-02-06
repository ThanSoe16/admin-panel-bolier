import OptionSelect from '@/components/shared/OptionSelect';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Image } from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import useGetLandingEngLanguageId from '@/features/base/hooks/useGetLandingEngLanguageId';
import { LandingLanguage } from '@/features/landing-languages/types';
import { useGetCategories } from '@/features/settings/category/services/queries';

const SubCategoryForm = ({
  form,
  handleClose,
  languages,
  mode = 'create',
  isLoading = false,
}: {
  form: any;
  handleClose: () => void;
  languages?: LandingLanguage[];
  mode: 'create' | 'update' | 'view';
  isLoading?: boolean;
}) => {
  const categories = useGetCategories({});
  const defaultLanguageId = useGetLandingEngLanguageId();
  return (
    <div>
      {' '}
      <FormField
        control={form.control}
        name={`templateCategoryId`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
              {categories.data?.body?.data && (
                <OptionSelect
                  placeholder="Select Category"
                  options={
                    categories.data.body?.data
                      .filter((category) => category.Status === 'ACTIVE')
                      .flatMap((category) => {
                        return {
                          label: category.TemplateCategoryContent.find(
                            (lang) => lang.languageId === defaultLanguageId,
                          )?.name,
                          value: category.id,
                        };
                      }) ?? []
                  }
                  {...field}
                  disabled={mode == 'view'}
                />
              )}
            </FormControl>
          </FormItem>
        )}
      />
      {languages ? (
        languages.map((language, index) => (
          <FormField
            key={language.id}
            control={form.control}
            name={`items.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row items-center space-x-2 justify-start ">
                  <Image
                    src={language?.File?.url}
                    width={20}
                    height={20}
                    alt="icon"
                    className="rounded-full w-5 h-5"
                  />
                  <p className="font-bold text-default text-base"> For {language.name} </p>
                </div>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={`Enter Sub Category Name`}
                    {...field}
                    maxLength={60}
                    disabled={mode == 'view'}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        ))
      ) : (
        <p className="text-gray-500">No languages available.</p>
      )}
      <div className="flex flex-row gap-4 justify-end items-center mt-4">
        <Button variant="outline" className="text-text-primary" type="button" onClick={handleClose}>
          Cancel
        </Button>
        {mode != 'view' && (
          <Button loading={isLoading} addDoneIcon>
            {mode == 'create' ? 'Create' : `Update`}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SubCategoryForm;

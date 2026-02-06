import ProfileAvatar from '@/components/shared/base/ProfileAvatar';
import EditButton from '@/components/shared/buttons/EditButton';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate } from '@/utils/dateTime';

interface TermsCardProps {
  flagSrc: string;
  language: string;
  title: string;
  updatedOn: string;
  description: string;
  onEdit: () => void;
}

const TermsCard = ({
  flagSrc,
  language,
  title,
  updatedOn,
  description,
  onEdit,
}: TermsCardProps) => {
  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <ProfileAvatar photo={flagSrc} name={language} className="rounded-full" />
              <span className="text-placeholder-secondary font-semibold normal-text">
                {language}
              </span>
            </div>
            <EditButton onClick={onEdit} asBtn />
          </div>

          <h2 className="text-lg font-semibold text-brand">{title}</h2>

          <p className="text-default-secondary text-sm leading-[22px]">
            <span className="mr-[10%]">Updated On: </span>
            <span className="text-default">{formatDate(updatedOn)}</span>
          </p>
          <div
            className="text-default-secondary"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </CardContent>
    </Card>
  );
};
export default TermsCard;

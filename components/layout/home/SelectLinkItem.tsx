import { useLinks } from '@/app/contexts/LinksContext';
import { Button } from '@/components/ui/button';
import {
  CodePenIcon,
  CodeWarsIcon,
  DevtoIcon,
  FacebookIcon,
  FreeCodeCampIcon,
  FrontendMentorIcon,
  GitHubIcon,
  GitLabIcon,
  HashNodeIcon,
  LinkedInIcon,
  StackOverflowIcon,
  TwitchIcon,
  TwitterIcon,
  YoutubeIcon,
} from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { validatePlatform, validateURL } from '@/utils/formValidation';
import { Equal, LinkIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export const SelectLinkItem = ({
  id,
  index,
}: {
  id: string;
  index: number;
}) => {
  // Context
  const {
    removeLinkItem,
    updateLinkItem,
    setPlatformError,
    setUrlError,
    linkItems,
  } = useLinks();

  // Find the current item in the context
  const linkItem = linkItems.find((item) => item.id === id);

  // Initialize local state with values from the context
  const [platform, setPlatform] = useState(linkItem?.platform || '');
  const [url, setUrl] = useState(linkItem?.url || '');

  // Constants
  const selectItems = [
    { value: 'codepen', label: 'CodePen', IconComponent: CodePenIcon },
    { value: 'codewars', label: 'CodeWars', IconComponent: CodeWarsIcon },
    { value: 'dev.to', label: 'Dev.to', IconComponent: DevtoIcon },
    { value: 'facebook', label: 'Facebook', IconComponent: FacebookIcon },
    {
      value: 'freecodecamp',
      label: 'FreeCodeCamp',
      IconComponent: FreeCodeCampIcon,
    },
    {
      value: 'frontendmentor',
      label: 'Frontend Mentor',
      IconComponent: FrontendMentorIcon,
    },
    { value: 'github', label: 'GitHub', IconComponent: GitHubIcon },
    { value: 'gitlab', label: 'GitLab', IconComponent: GitLabIcon },
    { value: 'hashnode', label: 'HashNode', IconComponent: HashNodeIcon },
    { value: 'linkedin', label: 'LinkedIn', IconComponent: LinkedInIcon },
    {
      value: 'stackoverflow',
      label: 'Stack Overflow',
      IconComponent: StackOverflowIcon,
    },
    { value: 'twitch', label: 'Twitch', IconComponent: TwitchIcon },
    { value: 'twitter', label: 'Twitter', IconComponent: TwitterIcon },
    { value: 'youtube', label: 'YouTube', IconComponent: YoutubeIcon },
  ];

  // Dynamic Classes for Label and Input fields
  const labelClass = (errorKey: 'platformError' | 'urlError') =>
    `text-xs mb-1 ${linkItem?.[errorKey] ? 'text-destructive' : ''}`;

  const inputClass = (errorKey: 'platformError' | 'urlError') =>
    `pl-11 bg-white focus:drop-shadow-[0_0_32px_rgba(99,60,255,0.25)] ${
      linkItem?.[errorKey] ? 'border-destructive' : ''
    }`;

  // Functions
  useEffect(() => {
    const linkItem = linkItems.find((item) => item.id === id);
    if (linkItem) {
      setPlatform(linkItem.platform);
      setUrl(linkItem.url);
    }
  }, [id, linkItems]);

  const handlePlatformChange = (selectedPlatform: string) => {
    setPlatform(selectedPlatform);
    updateLinkItem(id, selectedPlatform, url);
    // Validate and set errors in the context
    const error = validatePlatform(selectedPlatform);
    setPlatformError(id, error);
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = event.target.value;
    setUrl(newUrl);
    updateLinkItem(id, platform, newUrl);
    // Validate and set errors in the context
    const error = validateURL(newUrl, platform);
    setUrlError(id, error);
  };

  const handleRemove = () => {
    removeLinkItem(id);
  };

  // SubComponent
  const IconSelectItem = ({
    value,
    label,
    IconComponent,
  }: {
    value: string;
    label: string;
    IconComponent: React.ElementType;
  }) => (
    <SelectItem className='group ' value={value}>
      <div className='flex gap-3 items-center'>
        <IconComponent className='text-secondary group-hover:text-primary group-focus:text-primary' />
        <p className='group-hover:text-primary group-focus:text-primary'>
          {label}
        </p>
      </div>
    </SelectItem>
  );

  return (
    <div className='bg-background px-5 py-5 rounded-lg lg:px-30'>
      <div className='flex justify-between items-center text-secondary'>
        <div className='flex gap-2 items-center'>
          <Equal size={20} />
          <h6 className='font-bold'>Link #{index + 1}</h6>
        </div>
        <Button onClick={handleRemove} variant={'ghost'}>
          Remove
        </Button>
      </div>
      <div className='flex flex-col gap-3'>
        <div>
          <Label htmlFor='platform' className={labelClass('platformError')}>
            Platform
          </Label>
          <Select name='platform' onValueChange={handlePlatformChange}>
            <SelectTrigger className='w-full bg-white focus:drop-shadow-[0_0_32px_rgba(99,60,255,0.25)]'>
              <SelectValue placeholder='Platform' />
            </SelectTrigger>
            <SelectContent>
              {selectItems.map((item) => (
                <IconSelectItem
                  key={item.value}
                  value={item.value}
                  label={item.label}
                  IconComponent={item.IconComponent}
                />
              ))}
            </SelectContent>
          </Select>
          {linkItem?.platformError && (
            <div className='text-destructive absolute right-4 bottom-3 text-xs'>
              {linkItem.platformError}
            </div>
          )}
        </div>
        <div className='relative'>
          <Label htmlFor='url' className='text-xs mb-1'>
            Link
          </Label>
          <Input
            name='url'
            onChange={handleUrlChange}
            placeholder='e.g. https://www.github.com/'
            className={inputClass('urlError')}></Input>
          <LinkIcon
            size={16}
            className='text-secondary absolute left-3 bottom-3'
          />
          {linkItem?.urlError && (
            <div className='text-destructive absolute right-4 bottom-3 text-xs'>
              {linkItem.urlError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

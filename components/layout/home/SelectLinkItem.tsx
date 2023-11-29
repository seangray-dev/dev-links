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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Equal, Link } from 'lucide-react';
import { useEffect, useState } from 'react';

export const SelectLinkItem = ({
  id,
  index,
}: {
  id: string;
  index: number;
}) => {
  const { removeLinkItem, updateLinkItem, linkItems } = useLinks();
  const [platform, setPlatform] = useState('');
  const [url, setUrl] = useState('');
  const selectItems = [
    { value: 'codepen', label: 'CodePen', IconComponent: CodePenIcon },
    { value: 'codewars', label: 'CodeWars', IconComponent: CodeWarsIcon },
    { value: 'devto', label: 'Dev.to', IconComponent: DevtoIcon },
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
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = event.target.value;
    setUrl(newUrl);
    updateLinkItem(id, platform, newUrl);
  };

  const handleRemove = () => {
    removeLinkItem(id);
  };

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
          <h6 className='font-bold'>Link #{index}</h6>
        </div>
        <Button onClick={handleRemove} variant={'ghost'}>
          Remove
        </Button>
      </div>
      <div className='flex flex-col gap-3'>
        <div>
          <p className='text-xs mb-1'>Platform</p>
          <Select onValueChange={handlePlatformChange}>
            <SelectTrigger className='w-full bg-white focus:drop-shadow-[0_0_32px_rgba(99,60,255,0.25)]'>
              <SelectValue placeholder='Github' />
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
        </div>
        <div className='relative'>
          <p className='text-xs mb-1'>Link</p>
          <Input
            onChange={handleUrlChange}
            placeholder='e.g. https://www.github.com/'
            className='bg-white pl-11 focus:drop-shadow-[0_0_32px_rgba(99,60,255,0.25)]'></Input>
          <Link size={16} className='text-secondary absolute left-3 bottom-3' />
        </div>
      </div>
    </div>
  );
};

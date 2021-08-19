// Ref: https://github.com/dotnetthailand/dotnetthailand.github.io/blob/96c540837bdcfe771f1a5fcd277b11d968c15ad8/src/components/PageMetadata/Person.tsx
import React  from "react";
import { Persona, PersonaSize } from '@fluentui/react/lib/Persona';
import { TooltipHost, ITooltipHostStyles } from '@fluentui/react/lib/Tooltip';
import { useId } from '@fluentui/react-hooks';

interface IPersonProps {
  author: IAuthorInfo;
}

export interface IAuthorInfo {
  username?: string;
  name: string;
  profileUrl: string;
  avatarUrl: string;
}

const Person = ({ author }: IPersonProps) => {
  const tooltipId = useId(author.username);
  const calloutProps = { gapSpace: 0 };
  const hostStyles: Partial<ITooltipHostStyles> = { root: { display: 'inline-block' } };

  return (
    <a key={author.username} href={author.profileUrl} target="_blank" rel="noreferrer" style={{marginTop: '10px'}}>
      <TooltipHost
        content={author.name}
        id={tooltipId}
        calloutProps={calloutProps}
        styles={hostStyles}
      >
        <Persona
          // styles={{
          //   root: { margin }
          // }}
          imageUrl={author.avatarUrl}
          text={author.name}
          size={PersonaSize.size40}
          hidePersonaDetails={true}
          imageAlt={author.name}
        />
      </TooltipHost>
    </a>
  )
}

export default Person;

import React, { ReactNode, createContext, useContext, useState } from 'react';

type LinkItem = {
  id: string;
  platform: string;
  url: string;
  platformError: string;
  urlError: string;
};

type LinksContextType = {
  linkItems: LinkItem[];
  addLinkItem: () => void;
  removeLinkItem: (id: string) => void;
  updateLinkItem: (id: string, platform: string, url: string) => void;
  setPlatformError: (id: string, error: string) => void;
  setUrlError: (id: string, error: string) => void;
};

const LinksContext = createContext<LinksContextType | undefined>(undefined);

export const useLinks = () => {
  const context = useContext(LinksContext);
  if (!context) {
    throw new Error('useLinks must be used within a LinksProvider');
  }
  return context;
};

type LinksProviderProps = {
  children: ReactNode;
};

export const LinksProvider: React.FC<LinksProviderProps> = ({ children }) => {
  const [linkItems, setLinkItems] = useState<LinkItem[]>([]);

  const addLinkItem = () => {
    const newLink = {
      id: Date.now().toString(),
      platform: '',
      url: '',
      platformError: '',
      urlError: '',
    };
    setLinkItems([...linkItems, newLink]);
  };

  const removeLinkItem = (id: string) => {
    setLinkItems(linkItems.filter((item) => item.id !== id));
  };

  const updateLinkItem = (id: string, platform: string, url: string) => {
    setLinkItems(
      linkItems.map((item) =>
        item.id === id ? { ...item, platform, url } : item
      )
    );
  };

  const setPlatformError = (id: string, error: string) => {
    setLinkItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, platformError: error } : item
      )
    );
  };

  const setUrlError = (id: string, error: string) => {
    setLinkItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, urlError: error } : item
      )
    );
  };

  return (
    <LinksContext.Provider
      value={{
        linkItems,
        addLinkItem,
        removeLinkItem,
        updateLinkItem,
        setPlatformError,
        setUrlError,
      }}>
      {children}
    </LinksContext.Provider>
  );
};

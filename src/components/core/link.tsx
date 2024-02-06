'use client';

import NextLink from 'next/link';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { ComponentProps, forwardRef } from 'react';

interface Props extends ComponentProps<typeof NextLink> {
    toLocale?: string
    activeClassName?: string
}

function Link({ href, ...rest }: Props, ref: Props['ref']) {
    href = href || '';
    const locale = "en"//useLocale();
    const pathname = usePathname();
    const { toLocale, activeClassName } = rest;

    function getLocalizedHref(originalHref: string) {
        return originalHref 
        // = originalHref.replace(/^\//, '/' + locale + '/');
        // return toLocale ? originalHref.replace('/' + locale + '/', '/' + toLocale + '/') : originalHref;
    }

    const localizedHref =
        typeof href === 'string'
            ? getLocalizedHref(href)
            : href.pathname != null
                ? { ...href, pathname: getLocalizedHref(href.pathname) }
                : href;

    return <NextLink legacyBehavior ref={ref} href={localizedHref} {...rest} />;
}

export default forwardRef(Link);
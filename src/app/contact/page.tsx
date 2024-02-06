import React from 'react';
import Navbar from '../../components/core/navbar';
import Footer from '../../components/core/footer';
import PageHead from '../../components/core/pagehead';
import TopHeader from "../../components/core/topheader";
import ContactInfo from '../../components/shared/contactinfo';
import ContactForm from "../../components/shared/contactform";

import getApp from '../cms/getapp';
import getContact from '../cms/getcontact';
import getWhoWeAre from '../cms/getwhoweare';
import getTeamHeads from '../cms/getteamheads';
import getTestimonial from '../cms/gettestimonial';

export default async function Contact({ params: { locale } }: { params: { locale: string } }) {
  // concurrent fetch
  const [app, contact, whoWeAre, teamHeads, testimonial] = await Promise.all([
    getApp(locale),
    getContact(locale),
    getWhoWeAre(locale),
    getTeamHeads(locale),
    getTestimonial(locale),
  ]);

  return (
    <>
      <TopHeader app={app} />

      <Navbar app={app} />

      <PageHead
        title={app?.navbar?.contactUsLabel}
        homeUrl="/"
        homeLabel={app?.navbar?.homeLabel}
        activePageLabel={app?.navbar?.contactUsLabel}
      />

      <ContactInfo app={app} contact={contact} />

      <ContactForm app={app} contact={contact} />

      <Footer app={app} />
    </>
  );
}